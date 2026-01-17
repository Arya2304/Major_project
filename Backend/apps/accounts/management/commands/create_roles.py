from django.core.management.base import BaseCommand
from apps.accounts.models import Role


class Command(BaseCommand):
    help = 'Create default roles for the application'

    def handle(self, *args, **options):
        roles = [
            {'name': 'normal', 'description': 'Normal user'},
            {'name': 'deaf', 'description': 'Deaf user'},
            {'name': 'mute', 'description': 'Mute user'},
        ]

        for role_data in roles:
            role, created = Role.objects.get_or_create(
                name=role_data['name'],
                defaults={'description': role_data['description']}
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created role: {role.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Role already exists: {role.name}')
                )

